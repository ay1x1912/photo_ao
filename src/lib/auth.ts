
import prisma from '@/db/index';
import {
    betterAuth
} from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { polar } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
const client = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server:"sandbox"
});

export const auth = betterAuth({
    appName: "better_auth_nextjs",
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 20,
    },
    plugins: [
        polar({
            client,
            // Enable automatic Polar Customer creation on signup
            createCustomerOnSignUp: true,
            // Enable customer portal
            enableCustomerPortal: true, // Deployed under /portal for authenticated users
            // Configure checkout
            checkout: {
                enabled: true,
                products: [
                    {
                        productId: process.env.BASIC_PRODUCT_ID!,
                        slug: "basic" 
                    },
                     {
                        productId: process.env.PREMIUM_PRODUCT_ID!, 
                        slug: "premium" 
                    }
                ],
                successUrl: "/success?checkout_id={CHECKOUT_ID}",
                authenticatedUsersOnly: true
            },
            // Incoming Webhooks handler will be installed at /polar/webhooks
            webhooks: {
                secret: process.env.POLAR_WEBHOOK_SECRET! ,
           onPayload: async (payload) => {
		// Handle the event
		switch (payload.type) {
			// Checkout has been created
			case "checkout.created":
				break;

			// Checkout has been updated - this will be triggered when checkout status goes from confirmed -> succeeded
			case "checkout.updated":
				break;

			// Subscription has been created
			case "order.created":
                try{
                   await  prisma.transaction.create({
                    data:{
                        amount:payload.data.totalAmount,
                        currency:payload.data.currency,
                        orderId:payload.data.checkoutId!,
                        plan:payload.data.productId==process.env.BASIC_PRODUCT_ID ? "basic": "premium",
                        userId:payload.data.customer.externalId!,
                        paymentId:payload.data.id,



                    }
                })
				break;
                }catch(error){
                    console.log("erro from order.create",error)
                    break;
                }

			// A catch-all case to handle all subscription webhook events
			case "order.updated":
				 try{
                   await prisma.transaction.update({
                    where:{
                        userId:payload.data.customer.externalId!
                    },
                    data:{
                        status:payload.data.status
                    }
                   })
				break;
                }catch(error){
                    console.log("erro from order.create",error)
                    break;
                }

			// Subscription has been activated
			case "order.paid":
				try{
                   await prisma.transaction.update({
                    where:{
                        userId:payload.data.customer.externalId!
                    },
                    data:{
                        status:payload.data.status
                    }
                   })
                   await prisma.userCredit.create({
                    data:{
                        userId:payload.data.customer.externalId!,
                        amount:payload.data.productId==process.env.BASIC_PRODUCT_ID ? 10: 20,
                    }
                   })
				break;
                }catch(error){
                    console.log("erro from order.create",error)
                    break;
                }

			// Subscription has been revoked/peroid has ended with no renewal
			case "order.refunded":
				try{
                   await prisma.transaction.update({
                    where:{
                        userId:payload.data.customer.externalId!
                    },
                    data:{
                        status:payload.data.status
                    }
                   })
                   await prisma.userCredit.update({
                    where:{
                        userId:payload.data.customer.externalId!,
                    },
                    data:{
                        amount:{
                            decrement:payload.data.refundedAmount,

                        }
                    }
                   })
				break;
                }catch(error){
                    console.log("erro from order.create",error)
                    break;
                }

			// Subscription has been explicitly canceled by the user
			

			default:
				console.log(`Unhandled event type ${payload.type}`);
		}
	}
                
            }
        })
    ]
});
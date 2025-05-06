"use client"
import React from 'react'
import CardWrapper from '../cardWrapper'
import FormError from '../form-error'
import  FormSuccess  from '../form-success'
import { FcGoogle } from 'react-icons/fc'
// import SocialButton from './social-button'
import { FaGithub } from 'react-icons/fa'
import { useAuthState } from '@/hooks/useAuth'
import{ LoginSchema} from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const SignIn = () => {
    const router = useRouter()
    const { error, success, loading, setSuccess, setError, setLoading, resetState } = useAuthState();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        try {
          await signIn.email({
            email: values.email,
            password: values.password
          }, {
            onResponse: () => {
              setLoading(false)
            },
            onRequest: () => {
              resetState()
              setLoading(true)
            },
            onSuccess: (ctx) => {
                setSuccess("LoggedIn successfully")
                router.replace('/dashboard')
            },
            onError: (ctx) => {
              setError(ctx.error.message);
            },
          });
        } catch (error) {
          console.log(error)
          setError("Something went wrong")
        }
      }
      return (
        <CardWrapper
            cardTitle='Sign In'
            cardDescription='Enter your email below to login to your account'
            cardFooterDescription="Don't have an account?"
            cardFooterLink='/signup'
            cardFooterLinkTitle='Sign up'
        >
            <Form {...form}>
                <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="email"
                                        placeholder='example@gmail.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="password"
                                        placeholder='********'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={loading} type="submit" className='w-full'>Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default SignIn
import { Library, LogOut, User, Wrench } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import type * as z from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

import githubIcon from '@/assets/icons/github.svg'
import googleIcon from '@/assets/icons/google.svg'
import { cn } from '@/lib/utils'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { signInformSchema, signUpformSchema } from './schemas'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

interface UserBoxProps {
  className?: string
}

export const UserBox = ({ className = '' }: UserBoxProps) => {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tabValue, setTabValue] = useState('signin')

  const { data: userSession } = useSession()

  const registerUserMutation = api.auth.manualSignUp.useMutation({
    onSuccess: (data) => {
      toast({
        title: data || 'Register successfully',
        content: 'Please login to continue',
        variant: 'success'
      })
      setTabValue('signin')
    },
    onError: (error) => {
      toast({
        title: error?.message || 'Register failed',
        variant: 'destructive'
      })
    }
  })
  // const loginUserMutation = api.auth.manualSignIn.useMutation({
  //   onSuccess: (data) => {
  //     toast({
  //       title: data || 'Login successfully',
  //       variant: 'success'
  //     })
  //     window.location.reload()
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: error?.message || 'Login failed',
  //       variant: 'destructive'
  //     })
  //   }
  // })

  const signInForm = useForm<z.infer<typeof signInformSchema>>({
    resolver: zodResolver(signInformSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const signUpForm = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSignInFormSubmit = () => {
    // loginUserMutation.mutate({
    //   username: data.username,
    //   password: data.password
    // })
    try {
      // await signIn()
      toast({
        title: 'Please try to continue with Google or Github',
        variant: 'destructive'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onSignUpFormSubmit = (data: z.infer<typeof signUpformSchema>) => {
    registerUserMutation.mutate({
      email: data.email,
      username: data.username,
      password: data.password
    })
  }

  return (
    <div className={cn(className)}>
      {userSession?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <span>{userSession.user.name}</span>
              <Avatar>
                <AvatarImage src={userSession.user.image || ''} />
                <AvatarFallback>{userSession.user.name}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              {t.topBar.controlMenu.myStudying.header}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link
                  href={`/profile/${userSession.user.id}/sets`}
                  className="w-full"
                >
                  <Library className="mr-2 h-4 w-4" />
                  <span>{t.topBar.controlMenu.myStudying.studySets}</span>
                  <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              {t.topBar.controlMenu.accountSetting.header}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>{t.topBar.controlMenu.accountSetting.profile}</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {userSession.user.isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href={'/admin'} className="w-full">
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>
                        {t.topBar.controlMenu.accountSetting.management}
                      </span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                void signOut({
                  callbackUrl: '/'
                })
              }
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t.topBar.controlMenu.accountSetting.logout}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Join with us?</Button>
            </DialogTrigger>
            <DialogContent>
              <Tabs
                defaultValue="signin"
                value={tabValue}
                onValueChange={setTabValue}
              >
                <DialogHeader className="text-[1.5rem] font-bold">
                  Can't wait to see you!!
                </DialogHeader>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger variant="underline" value="signin">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger variant="underline" value="signup">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <Form {...signInForm}>
                    <form
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={signInForm.handleSubmit(onSignInFormSubmit)}
                      className="flex flex-col"
                    >
                      <div className="space-y-2">
                        <FormField
                          control={signInForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Huyhehe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signInForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="********"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="ml-auto mt-4">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="signup">
                  <Form {...signUpForm}>
                    <form
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={signUpForm.handleSubmit(onSignUpFormSubmit)}
                      className="flex flex-col"
                    >
                      <div className="space-y-2">
                        <FormField
                          control={signUpForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="abc@gmail.com"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Huyhehe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="********"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="********"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="ml-auto mt-4">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <div className="flex items-center gap-2">
                  <span className="h-px grow bg-black/20"></span>
                  <span className="text-black/50">Or</span>
                  <span className="h-px grow bg-black/20"></span>
                </div>
                <div className="mt-4 space-y-2">
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-100 p-2"
                    onClick={() => void signIn('google')}
                  >
                    <Image src={googleIcon} width={30} height={30} alt="gg" />
                    <span>
                      Continue with <b>Google</b>
                    </span>
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-black p-2 text-white"
                    onClick={() => void signIn('github')}
                  >
                    <Image
                      src={githubIcon}
                      width={35}
                      height={35}
                      alt="github"
                    />
                    <span>
                      Continue with <b>Github</b>
                    </span>
                  </div>
                </div>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

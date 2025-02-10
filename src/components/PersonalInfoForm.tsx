import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { personalInfoSchema } from "./MultiStepForm";

export default function PersonalInfoForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof personalInfoSchema>>;
}) {
  return (
    <div className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle>Personal info</CardTitle>
        <CardDescription>
          Please provide your name, email address, and phone number.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="e.g. Stephen King" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Email Address</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. stephenking@lorem.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Phone Number</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="e.g. +1 234 567 890" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </div>
  );
}

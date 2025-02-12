import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import { personalInfoSchema } from "../MultiStepForm";
import { useMultiStepForm } from "@/context/FormContext";

export default function PersonalInfoForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof personalInfoSchema>>;
}) {
  const { handleNextStep, handleUpdatePersonalInfo } = useMultiStepForm();

  function onSubmit(data: z.infer<typeof personalInfoSchema>) {
    handleUpdatePersonalInfo(data);
    handleNextStep();
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Personal info</CardTitle>
        <CardDescription>
          Please provide your name, email address, and phone number.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-5 items-center justify-between pb-2">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. Stephen King"
                      autoComplete="name"
                      {...field}
                    />
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
                    <Input
                      placeholder="e.g. +1 234 567 890"
                      type="tel"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <button className="hidden" type="submit" />
          </form>
        </Form>
      </CardContent>
    </>
  );
}

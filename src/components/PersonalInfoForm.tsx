import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMultiStepForm } from "@/context/FormContext";

const personalInfoSchema = z.object({
  fullName: z.string(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string(),
});

export default function PersonalInfoForm() {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const { handleNextStep } = useMultiStepForm();

  function onSubmit() {
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
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormMessage />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="e.g. +1 234 567 890"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </>
  );
}

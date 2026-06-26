"use client"

import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import { useForm as useFormspreeForm } from '@formspree/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(80, "Name is too long"),
    number: z.string()
        .min(10, "Number must be at least 10 digits")
        .max(13, "Number is too long")
        .regex(/^[0-9]+$/, "Must be a valid number")
});

export default function RequestCallBackForm() {
    const [state, handleSubmit] = useFormspreeForm("mwpoaewv");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            number: ""
        }
    });

    if(state.succeeded){
        toast.success("Callback request submitted successfully!", {
            description: "We'll contact you shortly.",
        });
    }

    if(state.errors){
        toast.error("Failed to submit the form. Please try again.");
    }
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className="space-y-3 w-full px-2 sm:px-3"
            >
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-sm">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
                                        className="text-gray-800 placeholder:text-neutral-500 font-medium h-10 md:h-11 text-xs md:text-sm border-primary"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Number Field + Request OTP Button */}
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-sm">Phone Number</FormLabel>
                                <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Enter 10-digit phone number"
                                            className="text-gray-800 placeholder:text-neutral-500 font-medium h-10 md:h-11 text-xs md:text-sm border-primary"
                                            type="tel"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="pt-1">
                    <Button
                        type="submit"
                        className="w-full h-10 md:h-11 text-xs md:text-sm"
                        size="default"
                        disabled={state.submitting}
                        >
                          {state.submitting ? "Submitting..." : "Request Callback"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

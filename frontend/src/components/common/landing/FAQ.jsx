import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function FAQ({ customerFaq, providerFaq }) {
    const faqs = {
        customer: [
            {
                question: "How do I book a service on Servana?",
                answer: "Simply browse the service categories, select a provider, and schedule your request through the platform."
            },
            {
                question: "Are the service providers verified?",
                answer: "Yes, all providers go through a verification process before being listed to ensure trust and quality."
            },
            {
                question: "How do I pay for a service?",
                answer: "You can securely pay through Servana using your preferred payment method once the service is completed."
            },
            {
                question: "Can I rate or review a provider?",
                answer: "Absolutely! After each job, you’ll be prompted to leave a rating and a short review of your experience."
            },
            {
                question: "What if I need to cancel or reschedule?",
                answer: "You can easily manage bookings from your dashboard. Cancel or reschedule based on the provider's policy."
            }
        ],
        provider: [
            {
                question: "How do I sign up as a provider?",
                answer: "Just click 'Join as Provider' and follow the onboarding steps including profile setup and service listing."
            },
            {
                question: "Do I need to pay to join Servana?",
                answer: "No, joining Servana is completely free. We only charge a small commission per confirmed booking."
            },
            {
                question: "How will I get paid?",
                answer: "Payments are deposited directly to your bank account every week, based on your completed jobs."
            },
            {
                question: "Can I choose when to work?",
                answer: "Yes! You have full flexibility to set your availability and accept only the jobs that fit your schedule."
            },
            {
                question: "How do I get notified of new jobs?",
                answer: "You’ll receive instant alerts via the app whenever a nearby customer requests a service you offer."
            }
        ]
    };

    return (
        <section id={`${customerFaq ? "customer-faq" : providerFaq ? "provider-faq" : 'faqs'}`} className={`text-center ${customerFaq || providerFaq ? "mb-[72px] pb-0" : ""}`}>
            {customerFaq || providerFaq
                ? <>
                    <h2>{customerFaq ? "Customer FAQs" : "Provider FAQs"}</h2>
                </>
                : <>
                    <h2>Your Questions, Answered</h2>
                    <p className='mb-[72px] mx-auto'>Clarifying how Servana works—for customers and professionals</p>
                </>
            }

            <div className='flex flex-col lg:flex-row gap-12'>
                {
                    customerFaq || providerFaq
                        ? <>
                            <div className="w-full">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full text-start"
                                >
                                    {customerFaq
                                        ? faqs.customer.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                                <AccordionTrigger className={'font-semibold'}>{faq.question}</AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                                    <p>{faq.answer}</p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                        : faqs.provider.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                                <AccordionTrigger className={'font-semibold'}>{faq.question}</AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                                    <p>{faq.answer}</p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </div>
                        </>
                        : <>
                            <div className="lg:w-[50%]">
                                <h3 className="mb-8">For Customers</h3>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full text-start"
                                >
                                    {
                                        faqs.customer.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                                <AccordionTrigger className={'font-semibold'}>{faq.question}</AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                                    <p>{faq.answer}</p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </div>
                            <div className="lg:w-[50%]">
                                <h3 className="mb-8">For Providers</h3>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full text-start"
                                // defaultValue="item-1"
                                >
                                    {
                                        faqs.provider.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                                <AccordionTrigger className={'font-semibold'}>{faq.question}</AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                                    <p>{faq.answer}</p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </div>

                        </>
                }

            </div>
        </section>
    )
}

export default FAQ

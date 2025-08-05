import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Single Accordion</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is React?</AccordionTrigger>
            <AccordionContent>
              React is a JavaScript library for building user interfaces, particularly web applications. It allows
              developers to create reusable UI components and manage application state efficiently.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Next.js?</AccordionTrigger>
            <AccordionContent>
              Next.js is a React framework that provides additional features like server-side rendering, static site
              generation, and built-in routing to help you build full-stack web applications.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
            <AccordionContent>
              Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom
              designs without writing custom CSS.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Multiple Accordion (Multiple Items Open)</h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="features">
            <AccordionTrigger>Product Features</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Advanced processing capabilities</li>
                <li>Intuitive user interface</li>
                <li>Cross-platform compatibility</li>
                <li>Real-time synchronization</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pricing">
            <AccordionTrigger>Pricing Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Basic Plan:</strong> $9.99/month
                </p>
                <p>
                  <strong>Pro Plan:</strong> $19.99/month
                </p>
                <p>
                  <strong>Enterprise:</strong> Contact us for pricing
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger>Support Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>We offer 24/7 customer support through:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Live chat</li>
                  <li>Email support</li>
                  <li>Phone support (Pro and Enterprise)</li>
                  <li>Community forums</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Accordion with Default Open Item</h2>
        <Accordion
          type="single"
          collapsible
          defaultValue="getting-started"
          className="w-full">
          <AccordionItem value="getting-started">
            <AccordionTrigger>Getting Started (Opens by Default)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p>Welcome! Here's how to get started:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Install the required dependencies</li>
                  <li>Set up your development environment</li>
                  <li>Create your first component</li>
                  <li>Run the development server</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="configuration">
            <AccordionTrigger>Configuration</AccordionTrigger>
            <AccordionContent>
              Configure your application by editing the config files in your project root. You can customize themes, add
              plugins, and set up environment variables.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="deployment">
            <AccordionTrigger>Deployment</AccordionTrigger>
            <AccordionContent>
              Deploy your application to various platforms like Vercel, Netlify, or your own server. Make sure to build
              your project first and configure environment variables.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

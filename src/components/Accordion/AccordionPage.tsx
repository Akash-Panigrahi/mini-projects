import Accordion from "./Accordion";

const data = [
  {
    id: "1",
    title: "What is React?",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: "2",
    title: "Why use an Accordion?",
    content: "Accordions save space by hiding secondary content until needed.",
  },
  {
    id: "3",
    title: "Can I nest accordions?",
    content:
      "Yes, you can render an accordion inside another's content section.",
  },
];

function AccordionPage() {
  return (
    <div>
      <Accordion items={data} />
    </div>
  );
}

export default AccordionPage;

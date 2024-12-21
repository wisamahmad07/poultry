import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const MedicineSuggestion = [
  {
    sr_no: "1",
    name: "Salmonella",
    sym_des:
      "Salmonella is a bacterial infection in chickens caused by Salmonella species, often leading to diarrhea, reduced growth, and mortality in severe cases. It can be transmitted through contaminated feed, water, or contact with infected birds. Prevention is primarily through biosecurity measures and vaccination, while antibiotics are used to treat infected flocks.",
    vaccine:
      "Salmonella can be prevented through vaccination, which helps build immunity in chickens before they encounter the bacteria. Administered early in life, the vaccine significantly reduces the risk of Salmonella infections, particularly in large flocks where the disease can spread rapidly through contaminated feed, water, or direct contact with infected birds.",
    antibiotic:
      "Salmonella infections, once detected in chickens, are treated with antibiotics to eliminate the bacterial infection. Prompt antibiotic treatment is essential to reduce mortality and limit the spread of the disease within the flock. However, antibiotic use must be carefully managed to prevent resistance, and it should only be used under veterinary guidance.",
    links: [
      {
        vaccine: "/vaccine",
        antibiotic: "/antibiotic",
        video: "/video",
      },
    ],
  },
  {
    sr_no: "2",
    name: "Coccidiosis",
    sym_des:
      "Coccidiosis is characterized by bloody or watery diarrhea, weakness, ruffled feathers, and decreased appetite. It primarily affects the intestines, leading to poor nutrient absorption and stunted growth. Severe cases can cause significant mortality, especially in young chickens, if left untreated.",
    vaccine:
      "Coccidiosis is effectively controlled with vaccines administered to chicks at a young age. The vaccine prepares the immune system to fight off Eimeria parasites, which cause intestinal damage. By vaccinating early, chickens can develop resistance to this parasitic disease, reducing the likelihood of severe outbreaks in poultry farms.",
    antibiotic:
      "Coccidiosis does not respond to antibiotics, as it is caused by protozoan parasites, not bacteria. Instead, infected chickens are treated with anti-coccidial drugs, which help control the spread of the parasites within the bird's intestines. Early treatment is critical to prevent severe intestinal damage and potential fatalities.",
    links: [
      {
        vaccine: "/vaccine",
        antibiotic: "/antibiotic",
        video: "/video",
      },
    ],
  },
  {
    sr_no: "3",
    name: "Newcastle Disease",
    sym_des:
      "Newcastle Disease (NCD) is a highly contagious viral disease that affects a wide range of birds, particularly poultry. Symptoms include respiratory distress such as coughing, sneezing, and nasal discharge, as well as neurological signs like twisted necks, tremors, and paralysis. Infected birds may also exhibit decreased egg production, watery greenish diarrhea, and sudden death in severe cases.",
    vaccine:
      "Vaccination is the most effective method to prevent Newcastle Disease. Live and inactivated vaccines are commonly used and are administered at various stages of a bird's life. Regular vaccination schedules, combined with biosecurity measures, help protect poultry flocks from this devastating disease.",
    antibiotic:
      "Antibiotics are not effective against Newcastle Disease since it is caused by a virus. Supportive care, such as maintaining proper hydration, nutrition, and stress management, can help reduce secondary bacterial infections and improve recovery chances in less severe outbreaks.",
    links: [
      {
        vaccine: "/vaccine",
        antibiotic: "/antibiotic",
        video: "/video",
      },
    ],
  },
];

export function MedicineSuggestionTable() {
  return (
    <Table className="border border-black">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Serial Number</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="w-[200px]">Symptoms/Description</TableHead>
          <TableHead className="w-[200px]">Vaccine</TableHead>
          <TableHead className="w-[200px]">Medicine</TableHead>
          <TableHead className="w-[100px] text-right">Downloads</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {MedicineSuggestion.map((suggestion) => (
          <TableRow key={suggestion.sr_no}>
            <TableCell className="font-medium">{suggestion.sr_no}</TableCell>
            <TableCell>{suggestion.name}</TableCell>
            <TableCell>{suggestion.sym_des}</TableCell>
            <TableCell>{suggestion.vaccine}</TableCell>
            <TableCell>{suggestion.antibiotic}</TableCell>
            {suggestion.links.map((link, index) => (
              <TableCell key={index} className="font-bold underline">
                <Link href={link.antibiotic}>AntiBiotic</Link>
                <br />
                <br />
                <Link href={link.vaccine}>Vaccine</Link>
                {link.vaccine}
                <br />
                <br />
                <Link href={link.video}>Video</Link>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

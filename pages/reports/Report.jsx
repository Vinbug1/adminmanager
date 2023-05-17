import { Fragment, useState } from "react";
import IndexLayout from '../layout/index'
import { Accordion,AccordionHeader,AccordionBody,} from "@material-tailwind/react";
import  UserList from "../users/UserList";

const Report = () => {
  const [open, setOpen] = useState(1);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <IndexLayout>
      <div className="mt-40 ml-20 border-2 rounded-5">
        <UserList />
        {/* <Fragment>
            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                Student Report
              </AccordionHeader>
              <AccordionBody>
               <UserList />
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                Staff Report?
              </AccordionHeader>
              <AccordionBody>
                We&apos;re not always in the position that we want to be at.
                We&apos;re constantly growing. We&apos;re constantly making mistakes.
                We&apos;re constantly trying to express ourselves and actualize our
                dreams.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 3}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                Financial Report
              </AccordionHeader>
              <AccordionBody>
                We&apos;re not always in the position that we want to be at.
                We&apos;re constantly growing. We&apos;re constantly making mistakes.
                We&apos;re constantly trying to express ourselves and actualize our
                dreams.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 4}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                Financial Report
              </AccordionHeader>
              <AccordionBody>
                We&apos;re not always in the position that we want to be at.
                We&apos;re constantly growing. We&apos;re constantly making mistakes.
                We&apos;re constantly trying to express ourselves and actualize our
                dreams.
              </AccordionBody>
            </Accordion>
        </Fragment> */}
      </div>
    </IndexLayout>
  )
}

export default Report
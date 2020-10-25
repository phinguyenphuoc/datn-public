import React from "react";
import { Collapse, IconButton } from "@material-ui/core";
import ReactGA from "react-ga";

const DATA = [
  {
    id: 1,
    question: "Do I need a piano at home to take piano lessons?",
    answer:
      "It is ideal if you do have a piano at home, but you can start lessons with our piano teachers by using a digital piano to practice on at home. We recommend a keyboard that has a minimum of 88 regular sized keys, a sustain pedal, and a touch sensitive response.",
  },
  {
    id: 2,
    question: "How long does it take to learn an instrument?",
    answer:
      "There is no set answer of how long it takes to learn an instrument. This varies from student to student and really depends on the individual, how much practicing you do and your age. Playing is a physical skill so it does take repetition to improve. With regular practice a basic level of playing can be accomplished within a few months. Most of our students take lessons on a long term basis because they want to be constantly improving and they find the lessons enjoyable.",
  },
  {
    id: 3,
    question:
      " I don't have any musical background or ability, can I still help my child practice?",
    answer:
      "Yes. Even if you don't have a musical background you can ask the teacher for advice on how to help your child practice. By simply monitoring that they are doing exercises a certain number of times per day the student will progress. You are your child’s best coach!",
  },
  {
    id: 4,
    question: "Can I interview a teacher before I begin lessons?",
    answer:
      "Our teachers are highly educated, experienced and licensed professional instructors. Each instructor has already been properly screened and has been very carefully chosen for their skills and abilities. Our job is to give you best music education possible, in order to do this our instructors are required to focus solely on teaching. For that reason, it is not in the instructor’s job description, nor in our policies, to be interviewed by prospective students or parents.",
  },
  {
    id: 5,
    question: "Are the teachers qualified?",
    answer:
      "Yes. All of our teachers are highly qualified professionals and many have extensive performance experience. All instructors are required to be licensed, university or college degreed in the programs and instruments they teach. Our teachers are experienced teachers and are chosen not only for their qualifications, but for their ability to relate to the students.",
  },
  {
    id: 6,
    question:
      "What if my child starts out in the lessons and genuinely hates the instrument?",
    answer:
      "They can try another instrument. Our students are free to switch over to another instrument at any time. It is better to try something else than to end up hating music! However, it does take several months to develop a basic level of playing. It is best to try and give it a minimum of 2 months before deciding to change instruments or to quit. Students are not locked into taking lessons with us, you are free to remove your child from lessons and discontinue payment anytime. All you need to do to discontinue lessons is fill out a withdrawal form before the 15th of your last month with us.",
  },
  {
    id: 7,
    question: "Can I just take one month of lessons?",
    answer:
      "In one month you really don’t have enough time to give your lessons a fair chance. It takes time to translate what you are learning into a physical skill. Much like going to the gym, it takes time to see results.",
  },
  {
    id: 8,
    question: "Can we take lessons every other week instead of every week?",
    answer:
      " It is very important that the teacher checks your progress and corrects your form every week, because of this, we only offer weekly lessons. In addition, it is impossible for us to find a student to fill the hole that is created on the weeks you are not here.",
  },
  {
    id: 9,
    question: " Is forty five long enough of a lesson time for beginners?",
    answer:
      "Yes. In the beginning, the forty five minutes gives the student a lot to practice at home. They could mentally cope with a longer lesson, but playing an instrument also involves a physical skill. To get the physical side down takes spaced repetition. In forty five minutes, they will get enough material to be able to learn well and develop proper technique. As they progress, and at the advice of the teacher, you can go to a longer lesson time.",
  },
  {
    id: 10,
    question: "How much practice should my child do each week?",
    answer:
      "We recommend a minimum of 15 minutes per day, five day’s per week. Although this is the absolute minimum recommendation, students will progress faster and remember more if they are able to practice more often. Short practice sessions done several times per day, every day, works out much better than longer practice sessions a few times per week. For young children, the practicing goes much better if the parent supervises.",
  },
];

function Faqs(props) {
  const [open, setOpen] = React.useState({});

  React.useEffect(() => {
    const stateOpen = {};
    DATA.forEach((item) => {
      stateOpen[`question${item.id}`] = false;
    });
    setOpen(stateOpen);
  }, []);

  const handleClick = (idQuestion) => () => {
    ReactGA.event({
      category: "FAQ Item Click",
      action: "FAQ Item Clicked at FAQ Page",
      label: `Click '${idQuestion} FAQ Item'`,
    });
    setOpen({
      ...open,
      [idQuestion]: !open[idQuestion],
    });
  };
  return (
    <section className="faq">
      <div className="faq__inner ds-main">
        <div className="faq__inner__wrapper">
          {DATA.map((item) => (
            <div
              className="question__item radius"
              key={item.id}
              onClick={handleClick(`question${item.id}`)}>
              <div>
                <p className="question primary">{item.question}</p>
                <IconButton>
                  {open[`question${item.id}`] ? (
                    <span className="icon-chevron-up"></span>
                  ) : (
                    <span className="icon-chevron-down"></span>
                  )}
                </IconButton>
              </div>
              <Collapse
                in={open[`question${item.id}`]}
                timeout="auto"
                unmountOnExit
                className="collapse"
              >
                <p>{item.answer}</p>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs;

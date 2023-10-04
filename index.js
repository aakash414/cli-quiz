#!/usr/bin/env node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

let totalCorrect = 0;

async function askQuestion(question, answers, correctAnswerIndex) {
  const options = [];
  answers.forEach((answer) => {
    options.push({ value: answer, label: answer });
  });

  const answer = await p.select({
    message: question,
    initialValue: "1",
    options: options,
  });

  const s = p.spinner();
  s.start();
  await setTimeout(1000);
  s.stop();

  if (answer == answers[correctAnswerIndex]) {
    totalCorrect++;
  }
}

class Question {
  constructor(question, answersArray, correctAnswerIndex) {
    this.question = question;
    this.answersArray = answersArray;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

async function main() {
  console.clear();

  await setTimeout(1000);

  p.intro(
    `${color.bgMagenta(
      color.black(
        " Welcome. Let us find out how much of a CLI expert you REALLY are. "
      )
    )}`
  );

  const question1 = new Question(
    "1) What is Git primarily used for?",
    ["Social networking", "Version control", "Video Editing", "Web Browsing"],
    1
  );

  const question2 = new Question(
    "2) Which command in Git is used to create a new branch?",
    ["git checkout", "git branch", "git commit", "git push"],
    1
  );

  const question3 = new Question(
    '3) What is a "merge conflict" in Git?',
    [
      "A situation where two branches have identical changes",
      "A situation where Git refuses to merge branches",
      "A situation where there are conflicting changes in different branches that need to be resolved manually",
      "A situation where two branches have different changes",
    ],
    2
  );

  const question4 = new Question(
    '4) In Git, what does "HEAD" refer to?',
    [
      "The most recent commit",
      "The most recent commit of the current branch",
      "The most recent commit of any branch",
      "The most recent commit that has been pushed to the remote repository",
    ],
    1
  );

  const question5 = new Question(
    '5) What does "git clone" do?',
    [
      "Create a new Git repository",
      "Creates a copy of a local repository",
      "Creates a copy of a remote repository",
      "List all branches in a repository",
    ],
    2
  );

  const question6 = new Question(
    '6) What is "rebasing" in Git, and when might you use it',
    [
      "It's a way to merge branches, typically used for feature branches",
      "It's a way to combine multiple commits into one, used for cleaning up commit history",
      "It's a way to create a new branch from an existing branch",
      "It's a way to undo the last commit",
    ],
    1
  );

  const question7 = new Question(
    '7) What is a "detached HEAD" state in Git ?',
    [
      "A branch that has been deleted",
      "A state where you are not on a branch but directly on a specific commit",
      "A branch that is ready to be merged",
      "A branch that has been deleted",
    ],
    1
  );

  const question8 = new Question(
    "8) How do you create a new branch in Git and switch to it in one step?",
    [
      "git branch new-branch-name",
      "git switch -b new-branch-name",
      "git checkout -b new-branch-name",
      "git create new-branch-name",
    ],
    2
  );

  const question9 = new Question(
    '9) What is the purpose of the "git pull" command?',
    [
      "To update your local repository with changes from a remote repository",
      "To push changes to a remote repository",
      "To create a new branch",
      "To merge two branches",
    ],
    0
  );

  const question10 = new Question(
    "10) How can you undo the last Git commit without losing the changes?",
    [
      'Use "git reset HEAD"',
      'Use "git checkout -b"',
      'Use "git revert"',
      'Use "git pull origin master"',
    ],
    0
  );

  const allQuestions = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  ];

  // Ask if the player is ready
  const readyToPlay = await p.select({
    message: "No cheating. 10 questions. Results at the end. Ready to play?",
    initialValue: "Yes",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  });

  if (readyToPlay == "Yes") {
    // Begin trivia game
    for (const question of allQuestions) {
      await askQuestion(
        question.question,
        question.answersArray,
        question.correctAnswerIndex
      );
    }

    // Decide what ending screen to show based on how many questions user answered correctly
    p.outro(
      `${color.bgMagenta(
        color.black(`You got ${totalCorrect} questions correct!`)
      )}`
    );

    if (totalCorrect == 10) {
      const s = p.spinner();
      s.start("Generating secret message");
      await setTimeout(5000);
      s.stop();
      p.outro(
        `${color.bgMagenta(
          color.black(`The command line is a tool that is ripe for change. `)
        )}`
      );
    } else {
      const s = p.spinner();
      s.start();
      await setTimeout(3000);
      s.stop();
      p.outro(
        `${color.bgMagenta(
          color.black(
            `You need 10/10 correct to unlock the secret message. Try again.`
          )
        )}`
      );
    }
  } else {
    p.outro(`${color.bgMagenta(color.black(`Ok. Bye!`))}`);
  }
}

main().catch(console.error);

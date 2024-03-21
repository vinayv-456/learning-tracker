import { MenuGroup } from "../../components/cascadingMenu/src/types";

export const menuGroup: MenuGroup = {
  id: "1",
  label: "Calendar",
  value: "Calendar",
  groupHeading: "Calendar",
  options: [
    {
      id: "1_101",
      label: "personal learnings",
      value: "personal learnings",
      groupHeading: "personal learnings",
      options: [
        {
          id: "2_101",
          label: "Dev",
          value: "Dev",
          groupHeading: "Dev",
          options: [
            {
              id: "3_101",
              label: "topic",
              value: "topic",
              groupHeading: "topic",
              options: [
                {
                  id: "4_101",
                  label: "Tailwindcss",
                  value: "Tailwindcss",
                  groupHeading: "",
                },
                {
                  id: "4_102",
                  label: "typescript",
                  value: "typescript",
                  groupHeading: "",
                },
                {
                  id: "4_103",
                  label: "javascript",
                  value: "javascript",
                  groupHeading: "",
                },
                {
                  id: "4_104",
                  label: "react",
                  value: "react",
                  groupHeading: "",
                },
              ],
            },
            {
              id: "3_102",
              label: "project",
              value: "project",
              groupHeading: "project",
            },
          ],
        },
        {
          id: "2_102",
          label: "DSA",
          value: "DSA",
          groupHeading: "DSA",
          options: [
            {
              id: "3_103",
              label: "topic",
              value: "topic",
              groupHeading: "topic",
              options: [
                {
                  id: "4_110",
                  label: "arrays",
                  value: "arrays",
                  groupHeading: "",
                },
                {
                  id: "4_111",
                  label: "strings",
                  value: "strings",
                  groupHeading: "",
                },
                {
                  id: "4_112",
                  label: "recursion",
                  value: "recursion",
                  groupHeading: "",
                },
              ],
            },
            {
              id: "3_104",
              label: "platform",
              value: "platform",
              groupHeading: "platform",
              options: [
                {
                  id: "4_113",
                  label: "leetcode",
                  value: "leetcode",
                  groupHeading: "",
                },
                {
                  id: "4_114",
                  label: "coding-nijas",
                  value: "coding-nijas",
                  groupHeading: "",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "1_102",
      label: "professional learnings",
      value: "professional learnings",
      groupHeading: "professional learnings",
      options: [
        {
          id: "2_103",
          label: "course",
          value: "course",
          groupHeading: "course",
          options: [
            {
              id: "3_105",
              label: "ML",
              value: "ML",
              groupHeading: "ML",
              options: [
                {
                  id: "4_115",
                  label: "lectures",
                  value: "lectures",
                  groupHeading: "",
                },
                {
                  id: "4_116",
                  label: "Discussion",
                  value: "Discussion",
                  groupHeading: "",
                },
                {
                  id: "4_117",
                  label: "Assignment",
                  value: "Assignment",
                  groupHeading: "",
                },
                {
                  id: "4_118",
                  label: "Midterm",
                  value: "Midterm",
                  groupHeading: "",
                },
                {
                  id: "4_119",
                  label: "project",
                  value: "project",
                  groupHeading: "",
                },
              ],
            },
            {
              id: "3_106",
              label: "QC",
              value: "QC",
              groupHeading: "QC",
              options: [
                {
                  id: "4_120",
                  label: "lectures",
                  value: "lectures",
                  groupHeading: "",
                },
                { id: "4_121", label: "quiz", value: "quiz", groupHeading: "" },
                {
                  id: "4_122",
                  label: "Assignment",
                  value: "Assignment",
                  groupHeading: "",
                },
                {
                  id: "4_123",
                  label: "Midterm",
                  value: "Midterm",
                  groupHeading: "",
                },
              ],
            },
            {
              id: "3_107",
              label: "ADA",
              value: "ADA",
              groupHeading: "ADA",
              options: [
                {
                  id: "4_124",
                  label: "lectures",
                  value: "lectures",
                  groupHeading: "",
                },
                {
                  id: "4_125",
                  label: "Assignment",
                  value: "Assignment",
                  groupHeading: "",
                },
                {
                  id: "4_126",
                  label: "Midterm",
                  value: "Midterm",
                  groupHeading: "",
                },
              ],
            },
          ],
        },
        {
          id: "2_104",
          label: "research",
          value: "research",
          groupHeading: "research",
          options: [
            {
              id: "3_108",
              label: "topic",
              value: "topic",
              groupHeading: "topic",
              options: [
                {
                  id: "4_127",
                  label: "paper",
                  value: "paper",
                  groupHeading: "",
                },
                {
                  id: "4_128",
                  label: "NLP(coursera)",
                  value: "NLP(coursera)",
                  groupHeading: "",
                },
                {
                  id: "4_129",
                  label: "training",
                  value: "training",
                  groupHeading: "",
                },
              ],
            },
            {
              id: "3_109",
              label: "practical",
              value: "practical",
              groupHeading: "practical",
              options: [],
            },
          ],
        },
      ],
    },
    {
      id: "1_103",
      label: "recreational",
      value: "recreational",
      groupHeading: "recreational",
      options: [
        { id: "2_105", label: "Good", value: "Good", groupHeading: "" },
        { id: "2_106", label: "Bad", value: "Bad", groupHeading: "" },
      ],
    },
  ],
};

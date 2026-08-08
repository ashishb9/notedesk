\# NoteDesk



NoteDesk is a static, lightweight personal knowledge base built for application support engineers, developers, and system administrators-especially those focused on Site Reliability Engineering (SRE) and cybersecurity. It serves as a fast, searchable repository for real-world fixes, terminal commands, and system architecture notes.



Because it relies on a flat JSON file rather than a database, NoteDesk is incredibly fast, free to host, and immune to backend vulnerabilities.



\## How to Add or Edit Notes



All note data is managed entirely within `notes.json`. There is no CMS or admin panel to log into.



1\. Open `notes.json` in your code editor.

2\. To add a new note, insert a new JSON object into the array following the exact schema below:



```json

{

&#x20; "id": 38,

&#x20; "category": "linux",

&#x20; "title": "Your Note Title",

&#x20; "problem": "A brief description of the issue or concept.",

&#x20; "fixes": \[

&#x20;   {

&#x20;     "title": "Method 1: The Solution",

&#x20;     "steps": \[

&#x20;       "First step goes here.",

&#x20;       "Wrap terminal commands in <code>code tags</code> for syntax highlighting."

&#x20;     ]

&#x20;   }

&#x20; ]

}


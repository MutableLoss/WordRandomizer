# Word Randomizer Extension

The Word Randomizer is a Chrome/Brave extension written to help anyone practice new words in any language. This extension takes a random word from a list of words, and gives you a new word at each study session.

_Word Randomizer supports both English and Japanese languages_

_Read docs in [日本語](https://github.com/MutableLoss/WordRandomizer/blob/master/README.ja.md)_

## How it Works

The extension grabs a word from it's word list at each interval, and sends you a notification that it's time to study. Clicking the extension icon will show you your new word. At each new interval you will get a new word, and you can also cycles through the your previous words for the day.

## Setup

Start by cloning this repository somewhere on your system, by using [Git](https://git-scm.com/downloads):

```
$ git clone https://github.com/MutableLoss/WordRandomizer.git
```

Within Chrome, you will need to install the extension manually. Open the extension settings, enable development mode, and then choose to install a local extension. Select the __src__ folder,  which can be found in the _wordRandomizer_ directory created by cloning the project.

### Generating Your Own Word List

_You will need to install [NodeJS](https://nodejs.org) on your system to generate word lists._

Word Randomizer can generate a wordList based on a CSV file with multple tables of words. The first column of each table is named after the type of word the table holds (e.g. Noun, Verb, Adverb, etc), as well as a Meaning column and Example column. You can use OSX Numbers to create your word list, with multiple sheets and/or tables. Here's an example:

[Example Coming Soon](http://#)

It you like using Numbers to record your words, you can export your words to a CSV file, and choosing to include all tables and headers.

With the CSV created, it's now time to generate the file for the extension. 

First, create a .env file in the project folder:

```
$ cd wordRandomizer
$ touch .env
```

In this file add the following parameters:

```
WORD_FILE=WordExport.csv
IGNORED_HEADERS=Particle,Pattern,Ending
```

The WORD_FILE setting is for the exported file you created, and the IGNORED_HEADERS settings is to ignore specific tables you don't want to extract data from. For instance, in the following example, I (the developer) like to document grammar rules and patterns in the same file, and since I  only want to study vocabulary, I have it set to ignore these tables, which are then identified by the first column of each table.

With everything set, all that's left is to generate the list, which you can do from the project directory:

```
$ npm run buildWords
```

This will create the new word list and put it in place for the extension to use. When you want to update the list with new words, export to CSV again, and run the buildWords script again.

### Using the Extension

Work in progress

### Extension Options

To tailor the experience to your needs, you have to following options provided by the extension:

* Study Interval: the amount of minutes between sessions
* Study Start Time: the hour in the day to start studying
* Study Stop Time: the hour in the day to stop studying
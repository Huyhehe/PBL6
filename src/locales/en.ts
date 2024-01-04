const en = {
  topBar: {
    navigationMenu: {
      brief: 'Telziuq',
      briefDescription: 'Enjoy Telziuq like the way you enjoy Quizlet',
      getStarted: {
        title: 'Get Started',
        introduction: {
          title: 'Introduction',
          description: 'Learn how to use this app'
        },
        assessmentTest: {
          title: 'Assessment Test',
          description: 'Wanna have a quick assessment test?'
        }
      },
      explore: {
        title: 'Explore',
        createYourSet: {
          title: 'Create your set',
          description:
            'Create your own set of words and phrases to practice and improve your English.'
        },
        grammarPractice: {
          title: 'Grammar Practice',
          description:
            'Practice your grammar skills with our grammar exercises.'
        },
        autoCorrection: {
          title: 'Auto Correction',
          description: 'Get your answers corrected automatically and instantly.'
        },
        pronunciation: {
          title: 'Pronunciation',
          description: 'Practice your pronunciation with our AI assistant.'
        }
      },
      aboutUs: 'About Us'
    },
    controlMenu: {
      myStudying: {
        header: 'My Studying',
        studySets: 'Study Sets'
      },
      accountSetting: {
        header: 'Account Setting',
        management: 'Management',
        profile: 'Profile',
        logout: 'Logout'
      }
    }
  },
  pages: {
    home: {
      mainFeatures: {
        title: 'You may love to try these!',
        checkYourSpelling: {
          title: 'Check your spelling',
          description: `Don't know how you spell it? Let's check it out!`
        },
        grammarPractice: {
          title: 'Grammar Practice',
          description:
            'Practice your grammar skills with our grammar exercises.'
        },
        autoCorrection: {
          title: 'Grammar check your writing',
          description: 'Get your writing corrected automatically and instantly.'
        },
        createSet: {
          title: 'Create your set',
          description:
            'Create your own set of words and phrases to practice and improve your English.'
        }
      },
      recommendQuiz: {
        title: 'Some Quiz you may love!',
        term: {
          singular: 'term',
          plural: 'terms'
        }
      }
    },
    profile: {
      tabs: {
        studySets: {
          header: 'Study Sets',
          set: {
            term: {
              singular: 'term',
              plural: 'terms'
            },
            private: 'Private',
            public: 'Public'
          }
        },
        quizzes: 'Quizzes',
        settings: 'Settings'
      }
    },
    studySet: {
      root: {
        sections: {
          flashCards: 'Flash Cards',
          learn: 'Learn',
          test: 'Test',
          match: 'Match'
        },
        tools: {
          play: 'Play',
          shuffle: 'Shuffle',
          prev: 'Previous',
          next: 'Next',
          fullScreen: 'Full Screen',
          share: 'Share',
          edit: 'Edit',
          createdBy: 'Created by'
        }
      },
      match: {
        cover: {
          title: 'Ready to play?',
          description:
            'Match all the terms with their definitions as fast as you can. Avoid wrong matches, they add extra time!',
          startGame: 'Start Game'
        },
        result: {
          title: 'Nice work! Can you match even faster?',
          seconds: 'seconds',
          description: 'Try and beat the best time of',
          yourRecord: 'Your Record',
          playAgain: 'Play Again'
        }
      },
      test: {
        submitTest: 'Submit test',
        submitDescription: 'All done! Ready to submit your test?',
        card: {
          term: 'Term',
          definition: 'Definition',
          of: 'of',
          truefalse: {
            chooseAnswer: 'Choose answer',
            true: 'True',
            false: 'False'
          },
          multipleChoice: {
            chooseMatchingItem: 'Choose matching item'
          },
          matching: {
            matchingQuestions: 'Matching questions',
            guideLine: 'Click a term to match it with a definition',
            guildAnswer: 'Select from list below'
          },
          written: {
            yourAnswer: 'Your answer',
            typeTheAnswer: 'Type the answer',
            next: 'Next'
          }
        },
        result: {
          title: 'Be kind to yourself, and keep practicing!',
          board: {
            correctAnswer: {
              singular: 'Correct Answer',
              plural: 'Correct Answers'
            },
            incorrectAnswer: {
              singular: 'Incorrect Answer',
              plural: 'Incorrect Answers'
            },
            tryFlashCards: 'Try to study with Flash Cards',
            tryMatchGame: 'Try to play Match Game'
          },
          youGotThis: `You've got this!`,
          awesome: 'Awesome!',
          noWorries: 'No worries! learning is a process!',
          notQuite: `Not quite, you're still learning!`
        }
      }
    }
  },
  fallback: {
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.'
    },
    wip: {
      title: 'Work in progress',
      description: 'Will be available soon. Stay tuned!'
    }
  }
}

export default en

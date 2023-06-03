export let echelleSaveResponses = {
  '1': {'message': "new echelle has been added successfully"},

  '-1': {
    'message': "libelle is required!",
    'failed': 'libelle'
  },
  '-2': {
    'message': "grade is required!",
    'failed': 'grade'
  },
  '-3': {
    'message': "grade is required!",
    'failed': 'grade'
  },
  '-4': {
    'message': "the target grade does not exist!",
    'failed': 'grade'
  }
}

export let echelleUpdateResponses = {
  '1': {'message': "the backend updated successfully"},

  '-1': {
    'message': "No grade given!"
  },

  '-2': {
    'message': "grade not found"
  },

  '-3': {
    'message': "grade is required",
    'failed': 'grade'
  },
  '-4': {
    'message': "the given grade does not exist",
    'failed': 'grade'
  }
}

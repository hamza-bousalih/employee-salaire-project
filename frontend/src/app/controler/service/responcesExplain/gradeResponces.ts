export let gradeSaveResponses = {
  '1': {'message': "new grade added successfully!"},

  '-1': {
    'message': "libelle is required!",
    'failed': 'libelle'
  }
}

export let gradeUpdateResponses = {
  '1': {'message': "the grade updated successfully"},

  '-1': {
    'message': "No grade given!"
  },

  '-2': {
    'message': "grade not found"
  }
}


export let gradeDeleteResponses = {
  '0': {'message': "no grad deleted"},

  '1': {'message': "the grade deleted successfully"},

  '-1': {
    'message': "No grade found to delete!"
  }
}

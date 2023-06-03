export let mandatSaveResponses = {
  '1': {'message': "the responsibility has been added successfully"},

  '-1': {
    'message': "backend is required",
    'failed': 'employee'
  },

  '-2': {
    'message': "backend cin is required",
    'failed': 'employee'
  },

  '-3': {
    'message': "the given backend does not exist!",
    'failed': 'employee'
  },

  '-4': {
    'message': "each backend can have one responsibility at time!"
  },

  '-5': {
    'message': "responsibility is required!",
    'failed': 'resp'
  },

  '-6': {
    'message': "responsibility is required!",
    'failed': 'resp'
  },

  '-7': {
    'message': "the given responsibility does not exist!",
    'failed': 'resp'
  },

  '-8': {
    'message': "start && end dates are required!",
    'failed': 'date'
  },

  '-9': {
    'message': "end date have to be after start date!",
    'failed': 'date'
  }
}

export let mandatUpdateResponses = {
  '1': {'message': "the responsibility updated successfully"},

  '-1': {'message': "targeted mandat doesn't exist"},

  '-2': {
    'message': "the given backend does not exist!",
    'failed': 'employee'
  },

  '-3': {
    'message': "the given responsibility does not exist!",
    'failed': 'resp'
  },

  '-4': {
    'message': "end date have to be after start date!",
    'failed': 'date'
  }
}

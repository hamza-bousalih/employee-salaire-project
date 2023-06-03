export let respSaveResponses = {
  '1': {'message': 'new responsibility added successfully'},
  '-1': {
    'message': 'the libelle is required!',
    'failed': 'libelle'
  },
  '-2': {
    'message': 'prime must have a positive value!',
    'failed': 'prime'
  },
  '-3': {
    'message': 'the echelon is required!',
    'failed': 'echelon'
  },
  '-4': {
    'message': 'the echelon code is required!',
    'failed': 'echelon'
  },
  '-5': {
    'message': 'the given echelon dose not exist!',
    'failed': 'echelon'
  },
}

export let respUpdateResponses = {
  '1': {'message': 'the responsibility updated successfully!'},
  '-1': {
    'message': 'code is required!',
    'failed': 'code'
  },
  '-2': {
    'message': 'the targeted responsibility does not exist!',
    'failed': 'code'
  },
  '-3': {
    'message': 'the prime must have a positive value!',
    'failed': 'prime'
  },
  '-4': {
    'message': 'the given echelon does not exist!',
    'failed': 'echelon'
  }
}

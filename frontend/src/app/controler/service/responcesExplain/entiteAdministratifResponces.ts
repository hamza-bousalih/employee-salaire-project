export let entiteSaveResponses = {
  '1': {'message': 'new entite administartif added successfully'},
  '-1': {
    'message': 'the libelle is required!',
    'failed': 'libelle'
  },
  '-2': {
    'message': 'the given chef is already chef of an other entite!',
    'failed': 'chef'
  },
  '-3': {
    'message': 'the given chef does not exist!',
    'failed': 'chef'
  },
}

export let entiteUpdateResponses = {
  '1': {'message': 'the entite updated successfully'},
  '-1': {
    'message': 'code is required!',
    'failed': 'code'
  },
  '-2': {
    'message': 'target entite administartif doesn\'t exist!',
    'failed': 'code'
  },
  '-3': {
    'message': 'libelle is required!',
    'failed': 'libelle'
  },
  '-4': {
    'message': 'the chef have to be a member in the entite!',
    'failed': 'chef'
  },
  '-5': {
    'message': 'the given chef is already chef of an other entite!',
    'failed': 'chef'
  },
  '-6': {
    'message': 'the given chef does not exist!',
    'failed': 'chef'
  },
}

export let entiteDeleteResponses = {
  '0': {
    'message': 'no entite Deleted!',
    'failed': 'code'
  },
  '-1': {
    'message': 'can\'t delete the entite, It contains members!',
    'failed': 'code'
  },
}

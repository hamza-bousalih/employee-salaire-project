export let echelonSaveResponses = {
  '1': {'message': "new echelon has been added successfully"},

  '-1': {
    'message': "libelle is required!",
    'failed': 'libelle'
  },
  '-2': {
    'message': "echelle is required!",
    'failed': 'echelle'
  },
  '-3': {
    'message': "echelle is required!",
    'failed': 'echelle'
  },
  '-4': {
    'message': "the target echelle does not exist!",
    'failed': 'echelle'
  },
  '-5': {
    'message': "next echelon not found",
    'failed': 'nextEchelon'
  },
  '-6': {
    'message': "prev echelon not found",
    'failed': 'prevEchelon'
  },
  '-7': {
    'message': "prime is a positive number",
    'failed': 'prime'
  },
  '-8': {
    'message': "delai is a positive number",
    'failed': 'delai'
  },
}

export let echelonUpdateResponses = {
  '1': {'message': "the backend updated successfully"},

  '-1': {
    'message': "No Echelon given!"
  },

  '-2': {
    'message': "echelon not found"
  },

  '-3': {
    'message': "prime is a positive number",
    'failed': 'prime'
  },
  '-4': {
    'message': "delai is a positive number",
    'failed': 'delai'
  },
  '-5': {
    'message': "echelle is required!",
    'failed': 'echelle'
  },
  '-6': {
    'message': "the target echelle does not exist!",
    'failed': 'echelle'
  },
  '-7': {
    'message': "next have be different of the current echelon!",
    'failed': 'nextEchelon'
  },
  '-8': {
    'message': "next echelon not found",
    'failed': 'nextEchelon'
  },
  '-9': {
    'message': "prev have be different of the current echelon!",
    'failed': 'prevEchelon'
  },
  '-10': {
    'message': "prev echelon not found",
    'failed': 'prevEchelon'
  }
}

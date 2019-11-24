import Api from '@/services/Api'

export default {
  test () {
    return Api().get('test')
  }
}
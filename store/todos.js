// firebase, firestoreActionの読み込み
import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

// データベースの設定
const db = firebase.firestore()
const todosRef = db.collection('todo')

export const state = () => ({
  todos: []
})

// 各アクションの設定
export const actions = {

  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) =>{
    bindFirestoreRef('todos', todosRef)
  }),

  // 追加アクション
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FiledValue.serverTimestamp()
      })
    }
  }),

  // 削除アクション
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),

  // toggleでtodoの完了、未完了を管理
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}

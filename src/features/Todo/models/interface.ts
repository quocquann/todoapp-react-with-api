
export interface Todo {
  id?: number
  name: string
  deadline: string
  isCompleted: boolean
}

export interface IAction {
  type: string
  payload: Todo | number | string | Todo[] | boolean
}

export interface TodoState {
  todos: Todo[]
  status: string,
  isLoading: boolean
}

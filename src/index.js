(function(exports) {
	'use strict';

	exports.app = new Vue({

	el: '.todoapp',

	data: {
		inputsDef: [
			{"key": "username", "placeholder": "Username"},
			{"key": "address", "placeholder": "Address"},
			{"key": "email", "placeholder": "Email"},
			{"key": "name", "placeholder": "Name"}
		],
		testData : {
			username: '',
			address: '',
			email: '',
			name: ''
		},
		newTodo: 'res',
		editedTodo: null,
		visibility: 'all'
	},

		// watch todos change for localStorage persistence
		// watch: {
		// 	todos: {
		// 		handler: function (todos) {
		// 			todoStorage.save(todos);
		// 		},
		// 		deep: true
		// 	}
		// },

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			filteredTodos: function () {
				return filters[this.visibility](this.todos);
			},
			remaining: function () {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {

			addTodo: function () {
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				
				this.todos.push({ title: value, completed: false });
				this.newTodo = '';
			},

			removeTodo: function (todo) {
				this.todos.$remove(todo);
			},

			editTodo: function (todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},

			doneEdit: function (todo) {
				if (!this.editedTodo) {
					return;
				}
				this.editedTodo = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},

			cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				this.todos = filters.active(this.todos);
			},

			hoge: function(e) {
				console.log(e, this)
			},

			setter: function(key, value) {
					sessionStorage.setItem(key, value);
					console.log(sessionStorage.getItem(key))
			}
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'todo-focus': function (value) {
				if (!value) {
					return;
				}
				var el = this.el;
				Vue.nextTick(function () {
					el.focus();
				});
			}
		}
	});

})(window)
$(document).ready(function () {
    const listTodo = JSON.parse(localStorage.getItem('listTodo')) || {};
    getAllTodo();

    $(document).on('submit', 'form', function (event) {
        event.preventDefault();
        let elementContent = $('input[name="content"]')
        let content = elementContent.val().trim().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');;
        let id = rand();

        if (validate(content)) { return false; }
        listTodo[id] = { content };
        addContent(id);
        elementContent.val('');
        scroll();
        setLocalStore();
    });

    $(document).on('click', '.icon', function (event) {
        event.preventDefault();
        let parent = $(this).parent();
        delete listTodo[parent.attr('data-id')];
        parent.remove();
        setLocalStore();
    });

    function rand() {
        let id = Math.floor(Math.random() * 10000 + 1);

        if (listTodo[id] !== undefined) {
            console.error('run rand');
            return rand();
        }

        return id;
    }

    function addContent(id) {
        $('.list-todo').append(`
            <div class="item d-flex" style="justify-content: space-between" data-id="${id}">
                <div class="content">${listTodo[id].content}</div>
                <button class="icon" type="button">x</button>
            </div>
        `);
        $('.list-todo .item:last').focus();
    }

    function validate(content) {
        let elementError = $('.error');

        if (content.trim().length === 0) {
            elementError.text('Not null').removeClass('d-none');
            return true;
        }

        if (content.trim().length > 255) {
            elementError.text('Content exceeds 255 characters.').removeClass('d-none');
            return true;
        }

        elementError.text('').addClass('d-none');
        return false;
    }

    function scroll() {
        $(".list-todo").scrollTop(9999);
    }

    function setLocalStore() {
        localStorage.setItem('listTodo', JSON.stringify(listTodo));
    }

    function getAllTodo() {
        for (let id in listTodo) {
            addContent(id);
        }
    }
});
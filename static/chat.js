//import createComment from "./utilities/createComment"
// get the data from the api


/**
 * name color selector
 * better nav
 * 
 * 
 */

const HOST = 'localhost'
const PORT = 3000
let commentsNumber = 0;

/**
 * 
 * @param {string} dir 
 * @returns {string}
 */
function getURL(dir) {
    return `http://${HOST}:${PORT.toString()}/${dir}`
}

const commentSection = document.getElementById('commentSection')


async function renderComments() {
    const commentDataRequest = await fetch(getURL('view_comments'))
    const commentDataJSON = await commentDataRequest.json()
    commentDataJSON.reverse()
    commentsNumber = commentDataJSON.length
    let comment;
    for (let i = 0; i < commentDataJSON.length; i++) {
        comment = createComment(commentDataJSON[i].author, commentDataJSON[i].content)
        commentSection.appendChild(comment)
        // adding space
        const breakElement = document.createElement('br')
        commentSection.appendChild(breakElement)
    } 
}

/**
 * @returns {Promise<boolean>}
 */
async function checkIfNewComments() {
    const _commentDataRequest = await fetch(getURL('view_comments'))
    const _commentDataJSON = await _commentDataRequest.json()

    if (_commentDataJSON.length != commentsNumber) {
        commentsNumber = _commentDataJSON.length
        return true
    }
    return false
}

function renderingCommentsLoop() {
    renderComments() // initial render
    setInterval(async () => {
        const areNewComments = await checkIfNewComments()
        if (areNewComments) {
            commentSection.innerHTML = ""
            renderComments()   
        }
    }, 2000)
}

renderingCommentsLoop()

/**
 * 
 * @param {string} author 
 * @param {string} content 
 * @param {number} date 
 * @returns HTMLElement 
 */
function createComment(author, content) {


    const div = document.createElement('div')
    const authorTextArea = createAuthorTextArea(author)
    const contentTextArea = createContentTextArea(content)


    div.appendChild(authorTextArea)
    div.appendChild(contentTextArea)
    // create a break
    
    div.className = 'comment'



    return div
}

/**
 * 
 * @param {string} author 
 * @returns HTMLElement
 */
function createAuthorTextArea(author) {
    let textarea = document.createElement('textarea')
    textarea.appendChild(document.createTextNode(author))
    textarea.className = 'author'
    textarea.readOnly = true
    return textarea
}

/**
 * 
 * @param {string} content 
 * @returns HTMLElement
 */
function createContentTextArea(content) {
    let textarea = document.createElement('textarea')
    textarea.appendChild(document.createTextNode(content))
    textarea.className = 'content'
    textarea.readOnly = true
    return textarea
}

const submitButton = document.getElementsByClassName('submit-comment-button')[0]
const contentInputTextArea = document.getElementsByClassName('content-input')[0]
submitButton.onclick = () => {
    setTimeout(() => {
        contentInputTextArea.value = ""
    }, 1000)
}
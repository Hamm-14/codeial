{let e=function(e){new Noty({theme:"relax",text:e,type:"success",layout:"topRight",timeout:1500}).show()},t=function(t){$(t).submit((function(m){m.preventDefault(),$.ajax({type:"post",url:"/comments/create",data:$(t).serialize(),success:function(t){let m=o(t.data.comment);$(`#post-comments-${t.data.comment.post}`).prepend(m),e("Comment Added"),$(".toggle-like-button").each((function(){new ToggleLike(this)}));let l=$(" .delete-comment-button, newComment");for(i of l)n(i);new ToggleLike($("toggle-like-button",m))},error:function(e){console.log(e.responseText)}})}))},o=function(e){return`<li id="comment-${e._id}-${e.post}">\n                <small>\n                    <a class="delete-comment-button" href="/comments/destroy/?cid=${e._id}&pid=${e.post}">X</a>\n                </small>\n        ${e.content}<br>\n        <small> ${e.user.name} </small>\n        <small>\n                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?type=Comment&id=${e._id}">\n                   0 Likes\n                </a>\n        </small>\n        </li>`},n=function(t){$(t).click((function(o){o.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#comment-${t.data.comment._id}-${t.data.comment.post}`).remove(),e("Comment Deleted")},error:function(e){console.log(e.responseText)}})}))},m=$(".delete-comment-button"),l=$(".new-comment-form");for(form of l)t(form);for(button of m)n(button);t()}
import{a as v,S as q,i as a}from"./assets/vendor-Db2TdIkw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();async function y(e,s=1){const i={key:"49512194-f753c2f34a7e7dbbd609db53f",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15};return await v.get("https://pixabay.com/api/",{params:i})}function g(e,s){const i=s.map(r=>`<li class="gallery-item">
    <a class="image-link" href="${r.largeImageURL}"><img class="image" src="${r.webformatURL}" alt="${r.tags}" title=""/></a>
    <ul class="image-descr-list">
<li class="descr-item">Likes<span class="descr-span">${r.likes}</span></li>
<li class="descr-item">Views<span class="descr-span">${r.views}</span></li>
<li class="descr-item">Comments<span class="descr-span">${r.comments}</span></li>
<li class="descr-item">Downloads<span class="descr-span">${r.downloads}</span></li>
    </ul>
    </li>`).join("");e.insertAdjacentHTML("beforeend",i),w()}const S=new q(".gallery-item a",{captionsData:"alt",captionDelay:250});function w(){S.refresh()}function M(e){e.innerHTML=""}function b(){const e=document.querySelector(".loader");e.style.display="flex"}function d(){const e=document.querySelector(".loader");e.style.display="none"}function L(){document.querySelector(".load-more-btn").classList.remove("visually-hidden")}function u(){document.querySelector(".load-more-btn").classList.add("visually-hidden")}const m=document.querySelector(".gallery"),h=document.querySelector(".form"),f=h.elements[0];f.classList.add("input");const B=h.elements[1];B.classList.add("button");const P=document.querySelector(".load-more-btn");let n=null,p=null,l=null;h.addEventListener("submit",$);function $(e){if(e.preventDefault(),M(m),u(),b(),l=f.value,n=1,l===""){d(),a.error({message:"Write your something you want to see",position:"topRight"});return}y(l,n).then(s=>{if(s.data.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u();return}else g(m,s.data.hits),p=Math.ceil(s.data.totalHits/15),n<p?L():a.info({position:"bottomCenter",message:"We're sorry, but you've reached the end of search results."})}).catch(()=>{a.error({message:"Bad request",position:"topRight"})}).finally(()=>{d(),f.value=""})}P.addEventListener("click",e=>{e.preventDefault(),u(),b(),n+=1,y(l,n).then(s=>{g(m,s.data.hits),n<p?L():a.info({position:"bottomCenter",message:"We're sorry, but you've reached the end of search results."})}).catch(()=>{a.error({message:"Bad request",position:"topRight"})}).finally(()=>{d()})});
//# sourceMappingURL=index.js.map

function index_inc() {
    console.log("증가 버튼 클릭");
    result = document.getElementById("result");

    let current = parseInt(result.innerText);
    result.innerText = current + 1;
    console.log(result);
}
function index_dec() {
    console.log("감소 버튼 클릭");
    result = document.getElementById("result");

    let current = result.innerText;
    result.innerText = parseInt(current) - 1;
    console.log(result);
}
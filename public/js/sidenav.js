$(() => {
    $("#sidenavBtn").click(openNav)
    $(".closebtn").click(closeNav)

    function openNav() {
        document.getElementById("sidenav").style.width = "250px"
        document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {
        document.getElementById("sidenav").style.width = "0"
        document.getElementById("main").style.marginLeft = "0";
    }
})
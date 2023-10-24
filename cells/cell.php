<?php 
$id = $_POST["id"];
$class = "red";
$cell = "One";
switch($id)
{
    case "0":
        $class = "red";
        $cell = "One";
        break;
    case "1":
        $class = "green";
        $cell = "Two";
        break;
    case "2":
        $class = "blue";
        $cell = "Three";
        break;
    case "3":
        $class = "orange";
        $cell = "Four";
        break;
}
sleep(1);
?>
<div class="<?=$class?>" style="background:<?=$class?>;color:white;text-shadow:1px 1px 1px #000">
    <h1>Container</h1>
    <div hx-trigger="load, every 8s consume" hx-post="/javascript/mystuff/htmx/cells/subcells.php" 
        hx-on="htmx:configRequest: event.detail.parameters.id2 = '1'" class="fade"></div>
    <div hx-trigger="load, every 9s consume" hx-post="/javascript/mystuff/htmx/cells/subcells.php"
        hx-on="htmx:configRequest: event.detail.parameters.id2 = '2'" class="fade"></div>
    <div hx-trigger="load, every 10s consume" hx-post="/javascript/mystuff/htmx/cells/subcells.php"
        hx-on="htmx:configRequest: event.detail.parameters.id2 = '3'" class="fade"></div>
</div>
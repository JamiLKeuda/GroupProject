<?php
// Output messages
$responses = [];
// Tarkistaa, että lomake on lähetetty.
if (isset)($_POST['first-name'], $_POST['last-name'], $_POST['email'], $_POST,['phone'], $_POST['radio'], $_POST['bio'])) {
    // Vahvista sähköpostiosoite.
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $responses[] = 'Sähköpostiosoite ei ole oikein!'
    }
    // Varmista, etteivät lomakekentät ole tyhjiä.
    //https://codeshack.io/how-to-create-contact-page-php/ PHP-pohja (poista linkin avaamisen jälkeen.)


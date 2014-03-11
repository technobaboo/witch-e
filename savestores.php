<?php
header('Content-Type: application/octetstream; name="somename.txt"');
header('Content-Type: application/octet-stream;
name="somename.txt"');
header('Content-Disposition: attachment; filename="somename.txt"');
// Output file contents here
echo "This is a test. The browser should suggest to save it as
'somename.txt'";
?>
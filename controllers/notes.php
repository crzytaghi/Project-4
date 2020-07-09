<?php

include_once __DIR__ . '/../models/note.php';
header('Content-Type: application/json');
if ($_REQUEST['action'] === 'index') {
  echo json_encode(Notes::all());
} else if ($_REQUEST['action'] === 'create') {
  // echo 'create';
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_note = new Note(null, $body_object->date, $body_object->title, $body_object->body);
  $all_notes = notes::create($new_note);
  echo json_encode($all_notes);
} elseif ($_REQUEST['action'] === 'update'){
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $updated_note = new Note($_REQUEST['id'], $body_object->date, $body_object->title, $body_object->body);
  $all_notes = Notes::update($updated_note);
  echo json_encode($all_notes);
  } elseif ($_REQUEST['action'] === 'delete') {
    $all_notes = Notes::delete($_REQUEST['id']);
    echo json_encode($all_notes);
  }

 ?>

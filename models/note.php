
<?php
$dbconn = null;
if(getenv('DATABASE_URL')){
$connectionConfig = parse_url(getenv('DATABASE_URL'));
$host = $connectionConfig['host'];
$user = $connectionConfig['user'];
$password = $connectionConfig['pass'];
$port = $connectionConfig['port'];
$dbname = trim($connectionConfig['path'],'/');
$dbconn = pg_connect(
"host=".$host." ".
"user=".$user." ".
"password=".$password." ".
"port=".$port." ".
"dbname=".$dbname
);
} else {
$dbconn = pg_connect("host=localhost dbname=notes port=6543");
}


class Note {
  public $id;
  public $date;
  public $title;
  public $body;

  public function __construct($id, $date, $title, $body){
    $this->id = $id;
    $this->date = $date;
    $this->title = $title;
    $this->body = $body;
  }
}

class Notes {
  static function all(){
    $notes = array();

    $results = pg_query("SELECT * FROM lists");

    $row_object = pg_fetch_object($results);
    while($row_object){
      $new_note = new note(
        intval($row_object->id),
        $row_object->date,
        $row_object->title,
        $row_object->body
      );
      $notes[] = $new_note;
      $row_object = pg_fetch_object($results);
    }
    return $notes;
  }

  static function create($note){
    $query = "INSERT INTO lists (date, title, body) VALUES ($1, $2, $3)";
    $query_params = array($note->date, $note->title, $note->body);
    pg_query_params($query, $query_params);
    return self::all();
  }

  static function update($updated_note){
      $query = "UPDATE lists SET date = $1, title = $2, body = $3 WHERE id = $4";
      $query_params = array($updated_note->date, $updated_note->title, $updated_note->body, $updated_note->id);
      $result = pg_query_params($query, $query_params);

      return self::all();
    }
    static function delete($id){
      $query = "DELETE FROM lists WHERE id = $1";
      $query_params = array($id);
      pg_query_params($query, $query_params);

      return self::all();
    }
}

 ?>

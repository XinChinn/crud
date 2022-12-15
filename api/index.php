<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM books";
        $book = json_decode( file_get_contents('php://input') );
        if(isset( $book->id) && is_numeric( $book->id)) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id',  $book->id);
            $stmt->execute();
            $books = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = ['status' => TRUE, 'message' => 'Record re successfully.', 'data' => $books];
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response = ['status' => TRUE, 'message' => 'Record re successfully.', 'data' => $books];
        }

        echo json_encode($books);
        break;
    case "POST":
        
        $book = json_decode( file_get_contents('php://input') );
     
        $sql = "INSERT INTO books(title, isbn, author, publisher, year_published, category) VALUES(:title, :isbn, :author, :publisher, :year_published, :category)";
        $stmt = $conn->prepare($sql);
       
        $stmt->bindParam(':title', $book->title);
        $stmt->bindParam(':isbn', $book->isbn);
        $stmt->bindParam(':author', $book->author);
        $stmt->bindParam(':publisher',$book->publisher);
        $stmt->bindParam(':year_published',$book->year_published);
        $stmt->bindParam(':category',$book->category);

        if($stmt->execute()) {
            $last_id = $conn->lastInsertId();
            $book->id = $last_id;
            $response = ['status' => TRUE, 'message' => 'Record created successfully.', 'data' => $book ];
        } else {
            $response = ['status' => FALSE, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $book = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE books SET title= :title, isbn =:isbn, author =:author, publisher =:publisher, year_published =:year_published, category =:category WHERE id = :id";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $book->id);
        $stmt->bindParam(':title', $book->title);
        $stmt->bindParam(':isbn', $book->isbn);
        $stmt->bindParam(':author', $book->author);
        $stmt->bindParam(':publisher', $publisher);
        $stmt->bindParam(':year_published',$book->year_published);
        $stmt->bindParam(':category',$book->category);

        if($stmt->execute()) {
            $response = ['status' => TRUE, 'message' => 'Record updated successfully.', 'data' => $book ];
        } else {
            $response = ['status' => FALSE, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM books WHERE id = :id";
        $book = json_decode( file_get_contents('php://input') );
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $book->id);

        if($stmt->execute()) {
            $response = ['status' => TRUE, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => FALSE, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
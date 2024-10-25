<?php
$host = getenv('postgres-evhd.railway.internal');
$dbname = getenv('railway');
$port = getenv('5432');
$user = getenv('postgres');
$password = getenv('UfSsxIKpQYVUCKGYlqdbNZlxDXsUigWJ');

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname;port=$port", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $telefone = $_POST['telefone'];
        $mensagem = $_POST['mensagem'];

        $sql = "INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (:nome, :email, :telefone, :mensagem)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':mensagem', $mensagem);

        if ($stmt->execute()) {
            echo "Dados cadastrados com sucesso!";
        } else {
            echo "Erro ao cadastrar dados.";
        }
    }
} catch (PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();
}
?>

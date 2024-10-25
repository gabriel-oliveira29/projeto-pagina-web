<?php
// Dados do banco de dados fornecidos
$PGHOST = "postgres-evhd.railway.internal";
$PGDATABASE = "railway";
$PGPORT = "5432";
$PGUSER = "postgres";
$PGPASSWORD = "UfSsxIKpQYVUCKGYlqdbNZlxDXsUigWJ";

try {
    // Conectar ao banco de dados PostgreSQL
    $conn = new PDO("pgsql:host=$host;dbname=$dbname;port=$port", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Obter dados do formulário
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $telefone = $_POST['telefone'];
        $mensagem = $_POST['mensagem'];

        // Inserir dados no banco
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

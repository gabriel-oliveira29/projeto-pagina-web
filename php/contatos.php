<?php
// Configurações do banco de dados fornecidas pelo Railway
$host = getenv('PGHOST') ?: 'default_host';
$port = getenv('PGPORT') ?: '5432';
$dbname = getenv('PGDATABASE') ?: 'railway';
$user = getenv('PGUSER') ?: 'postgres';
$password = getenv('PGPASSWORD') ?: 'default_password';

try {
    // Conectar ao banco de dados PostgreSQL usando os valores das variáveis de ambiente
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
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

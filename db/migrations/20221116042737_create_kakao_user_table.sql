-- migrate:up
CREATE TABLE kakao_user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE kakao_user;
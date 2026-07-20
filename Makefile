DOCKER_COMPOSE := docker compose

docker-build-dev: ## Собрать dev-образы host и favorites
	$(DOCKER_COMPOSE) --profile dev build

docker-up-dev: ## Запустить host и favorites
	$(DOCKER_COMPOSE) --profile dev up host

docker-start-dev: ## Запустить существующие контейнеры
	$(DOCKER_COMPOSE) --profile dev start

docker-stop-dev: ## Остановить контейнеры без удаления
	$(DOCKER_COMPOSE) --profile dev stop

docker-down: ## Остановить и удалить контейнеры проекта
	$(DOCKER_COMPOSE) --profile dev down
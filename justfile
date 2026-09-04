image := "my-envio-indexer"

build tag="local":
    docker build -t {{ image }}:{{ tag }} .

deploy-kind tag="local": (build tag)
    kind load docker-image {{ image }}:{{ tag }} --name local-platform
    kubectl rollout restart statefulset/indexer -n chain-indexer
    kubectl rollout status statefulset/indexer -n chain-indexer

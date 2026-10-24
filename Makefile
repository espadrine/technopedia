.PHONY: all clean

# Build the static content (README: "Use `make` to build the static content").
all:
	npm run build

clean:
	rm -rf dist

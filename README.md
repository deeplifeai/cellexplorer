### Quick start

1. **Prepare Python Environment**
   Create a virtual environment and install the required packages:
   ```bash
   python3 -m venv venv
   source venv/bin/activate

Install the package.

```bash
pip install -e .
```

Launch Annotate with an example [anndata](https://anndata.readthedocs.io/en/latest/) file

```bash
cellxgene launch https://cellxgene-example-data.czi.technology/pbmc3k.h5ad
```

2. **Installation errors**

File "/home/pribeiro/miniconda3/lib/python3.12/site-packages/flatbuffers/compat.py", line 19, in <module>
    import imp
ModuleNotFoundError: No module named 'imp'

1. In the compat.py file, replace 'imp' with importlib
2. imp.find_module('numpy') replace with importlib.machinery.PathFinder.find_spec('numpy')


If encountering numpy errors no solution yet...
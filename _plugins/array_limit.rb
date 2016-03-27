module Jekyll
  module ArrayLimitFilter
    # modulo was added at some point to jekyll
    # keeping this as a demo in case I want to add something similar later.
    def limit(array, limit)
      array[0..(limit-1)]
    end
  end
end
Liquid::Template.register_filter(Jekyll::ArrayLimitFilter)

_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
FilterArtworks = require '../../collections/filter_artworks.coffee'
FilterView = require './view.coffee'
FilterRouter = require './router/index.coffee'

module.exports =

  setupFilter: (options) ->
    defaults =
      startHistory: yes
      infiniteScroll: true
      includeFixedHeader: includeFixedHeader
      includeAllWorks: false
      hideForSaleButton: false
      forSale: 'true'

    { aggregations,
      el,
      stuckParam,
      defaultHeading,
      startHistory,
      infiniteScroll,
      filterRoot,
      includeFixedHeader,
      includeAllWorks,
      forSale,
      facets,
      hideForSaleButton,
    } = _.defaults options, defaults

    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = new Backbone.Model _.extend queryParams,
      page: 1
      size: 10
      for_sale: forSale
      aggregations: aggregations

    if stuckParam
      _.extend params, stuckParam

    collection = new FilterArtworks

    view = new FilterView
      el: el
      collection: collection
      params: params
      defaultHeading: defaultHeading
      filterRoot: filterRoot
      hideForSaleButton: hideForSaleButton
      includeAllWorks: includeAllWorks
      infiniteScroll: infiniteScroll
      includeFixedHeader: includeFixedHeader
      facets: facets

    router = new FilterRouter
      params: params
      urlRoot: filterRoot
      stuckParamKey: _.first(_.keys(stuckParam))

    collection.fetch
      data: params.toJSON()
      success: ->
        collection.trigger 'initial:fetch'

    Backbone.history.start(pushState: true) if startHistory

    { params: params, collection: collection, view: view, router: router }
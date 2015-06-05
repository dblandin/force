Q = require 'q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ resize } = require '../../../../components/resizer/index.coffee'
PartnerShow = require '../../../../models/partner_show.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'
template = -> require('./template.jade') arguments...

module.exports = class RelatedShowsView extends Backbone.View

  className: 'show-related-shows-container'

  initialize: ({ @title }) ->
    @listenTo @collection, 'sync', @render
    @listenTo @collection, 'shows:fetchedRelatedImages', @filterRelatedImages
    @listenTo @collection, 'reset', @render
    $(window).on "resize", @hideSecondRow

  render: ->
    filteredCollection = @collection.filter (show) ->
      show.get('displayable')
    filteredCollection = new PartnerShows filteredCollection
    @$el.html template
      fromShowGuide: location.search.match "from-show-guide"
      title: @title
      shows: filteredCollection.models
    this

  filterRelatedImages: ->
    relatedImagesCollection = @collection.map (show) =>
      show.related().relatedImages = new Backbone.Collection
      concatenatedArtworks = show.related().installShots.models.concat show.related().artworks.invoke('defaultImage')
      show.related().relatedImages.add @fillRowFilter(concatenatedArtworks)
      show
    @collection.reset relatedImagesCollection

  fillRowFilter: (images) ->
    containerWidth = $('.show-related-shows-title').width() - $('.show-related-show-info').outerWidth()
    totalWidth = 0
    filteredImages = images.filter (image) ->
      width = image.get('aspect_ratio') * 270 + 6
      return false if totalWidth + width > containerWidth or !image.get('aspect_ratio')?
      totalWidth += width
      totalWidth < containerWidth

  hideSecondRow: =>
      @filterRelatedImages()


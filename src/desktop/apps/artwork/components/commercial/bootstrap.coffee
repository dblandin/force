module.exports = (sd, { artwork, enableNewInquiryFlow }) ->
  sd.COMMERCIAL =
    enableNewInquiryFlow: enableNewInquiryFlow
    artwork:
      id: artwork.id
      _id: artwork._id
      price: artwork.price
      is_acquireable: artwork.is_acquireable
      is_inquireable: artwork.is_inquireable
      is_price_range: artwork.is_price_range
      partner_id: artwork.partner._id
      partner_type: artwork.partner?.type
      edition_sets: artwork.edition_sets
  if artwork.fair?
    sd.COMMERCIAL.artwork.fair =
      id: artwork.fair.id
      name: artwork.fair.name
      end_at: artwork.fair.end_at

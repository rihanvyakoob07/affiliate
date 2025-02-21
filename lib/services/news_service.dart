import 'dart:convert';
import '../models/news_model.dart';
import 'package:http/http.dart' as http;

class NewsService {
  // Note: Replace with your actual News API key
  static const String apiKey = '3fb55d6d5683439f959651e69426d1e0';
  static const String baseUrl = 'https://newsapi.org/v2/everything';

  Future<List<NewsArticle>> getCommerceNews() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl?q=ecommerce&apiKey=$apiKey'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final articles = data['articles'] as List;
        return articles
            .take(3)
            .map((article) => NewsArticle.fromJson(article))
            .toList();
      }
      return _getFallbackNews();
    } catch (e) {
      return _getFallbackNews();
    }
  }

  List<NewsArticle> _getFallbackNews() {
    // Fallback data with free placeholder images
    return [
      NewsArticle(
        title: 'E-commerce Growth Trends in 2025',
        description:
            'Analysis of the latest trends in online retail and digital commerce',
        imageUrl: 'https://source.unsplash.com/800x400/?ecommerce',
        url: 'https://example.com/news/1',
      ),
      NewsArticle(
        title: 'Digital Payment Solutions Evolve',
        description:
            'New innovations in digital payment technologies and their impact',
        imageUrl: 'https://source.unsplash.com/800x400/?digital-payment',
        url: 'https://example.com/news/2',
      ),
      NewsArticle(
        title: 'Sustainable E-commerce Practices',
        description: 'How online retailers are adopting eco-friendly practices',
        imageUrl: 'https://source.unsplash.com/800x400/?sustainable-shopping',
        url: 'https://example.com/news/3',
      ),
    ];
  }
}

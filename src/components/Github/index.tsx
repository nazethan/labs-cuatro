import React, { useEffect, useState, ReactNode, useRef } from 'react';
import styles from './styles.module.css';

interface GitHubUser {
  login?: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  company?: string;
  location?: string;
  blog?: string;
  twitter_username?: string;
  github_url: string;
}

interface GitHubProfileCardProps {
  /** GitHub username (required) */
  username: string;
  /** Show detailed stats (followers, repos, etc.) - default: true */
  showStats?: boolean;
  /** Show contact links (blog, twitter) - default: true */
  showLinks?: boolean;
  /** Enable 3D tilt effect - default: true */
  enableTilt?: boolean;
  /** Enable cursor-following glow - default: true */
  enableGlow?: boolean;
  /** Glow color (CSS rgba/hex) - default: "rgba(59, 130, 246, 0.5)" */
  glowColor?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Dynamic GitHub Profile Card Component with 3D Effects
 * Inspired by reactbits.dev ProfileCard - Features 3D tilt and cursor-following glow
 * 
 * Usage:
 * <GitHubProfileCard username="torvalds" />
 * <GitHubProfileCard 
 *   username="gvanrossum" 
 *   enableTilt={true} 
 *   enableGlow={true}
 *   glowColor="rgba(59, 130, 246, 0.5)"
 * />
 */
export function GitHubProfileCard({
  username,
  showStats = true,
  showLinks = true,
  enableTilt = true,
  enableGlow = true,
  glowColor = 'rgba(59, 130, 246, 0.5)',
  className = '',
}: GitHubProfileCardProps): ReactNode {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGitHubUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
          throw new Error(`GitHub user "${username}" not found`);
        }
        
        const data = await response.json();
        setUser({
          ...data,
          github_url: `https://github.com/${username}`,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubUser();
    }
  }, [username]);

  // Handle 3D tilt and glow effects on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate tilt angles (max 15 degrees)
    if (enableTilt) {
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((centerY - y) / centerY) * 15;
      setTilt({ x: rotateX, y: rotateY });
    }

    // Calculate glow position
    if (enableGlow) {
      setGlowPos({
        x: x - 50,
        y: y - 50,
      });
    }
  };

  const handleMouseLeave = () => {
    if (enableTilt) setTilt({ x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div className={`${styles.card} ${styles.loading} ${className}`}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={`${styles.card} ${styles.error} ${className}`}>
        <div className={styles.errorContent}>
          <p>{error || 'Unable to load profile'}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.cardWrapper} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      {enableGlow && (
        <div
          className={styles.glow}
          style={{
            left: `${glowPos.x}px`,
            top: `${glowPos.y}px`,
            background: `radial-gradient(circle, ${glowColor}, transparent)`,
          }}
        />
      )}

      {/* Card with 3D perspective */}
      <div
        className={`${styles.card} ${styles.perspectiveCard}`}
        style={
          enableTilt
            ? {
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }
            : undefined
        }
      >
      {/* Header with avatar and basic info */}
      <div className={styles.header}>
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{user.name || user.login}</h3>
          {user.login && (
            <a
              href={user.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.username}
            >
              @{user.login}
            </a>
          )}
        </div>
      </div>

      {/* Bio section */}
      {user.bio && <p className={styles.bio}>{user.bio}</p>}

      {/* Location and company */}
      <div className={styles.metadata}>
        {user.location && (
          <div className={styles.metaItem}>
            <span className={styles.icon}>📍</span>
            <span>{user.location}</span>
          </div>
        )}
        {user.company && (
          <div className={styles.metaItem}>
            <span className={styles.icon}>🏢</span>
            <span>{user.company}</span>
          </div>
        )}
      </div>

      {/* Stats section */}
      {showStats && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.followers ?? 0}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.following ?? 0}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.public_repos ?? 0}</span>
            <span className={styles.statLabel}>Repos</span>
          </div>
        </div>
      )}

      {/* Links section */}
      {showLinks && (user.blog || user.twitter_username) && (
        <div className={styles.links}>
          {user.blog && (
            <a
              href={user.blog}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              title="Website"
            >
              🌐 Website
            </a>
          )}
          {user.twitter_username && (
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              title="Twitter"
            >
              𝕏 Twitter
            </a>
          )}
        </div>
      )}

      {/* CTA Button */}
      <a
        href={user.github_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        View on GitHub
      </a>
      </div>
    </div>
  );
}

export default GitHubProfileCard;
